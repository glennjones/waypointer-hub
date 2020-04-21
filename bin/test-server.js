
const Path = require("path");
const Blipp = require('blipp');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Hoek = require('@hapi/Hoek');
const Nunjucks = require('nunjucks');
const NunjucksTools = require('nunjucks-tools');
const WaypointerJSON = require('../bin/waypointer.json');
const Theme = require('../index.js');

const assetDirPath = Path.join(__dirname, '..' + Path.sep + 'assets');


// function to get theme data as it would be provide if we used code as plug-in
async function getThemeData(server){
    return new Promise((resolve) => {
        Theme.register(server, {}, (theme) => {
            // delete those items which would not be pass into template context
             delete theme.templatePath;
             delete theme.partialsPath;
             delete theme.halpersPath;
             delete theme.groupPages;
             delete theme.groupItemPages;
             delete theme.assetPath;

             resolve(theme);
         });
    });
}




(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3025,
    });

    await server.register([
        Inert,
        Vision,
        Blipp
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    const theme = await getThemeData(server);

    let noCache = true
    server.views({
        path: Path.join(__dirname, '../templates'),
        engines: {
        html: {
            compile: (src, options) => {
                const template = Nunjucks.compile(src, options.environment);
                return  (context) => {
                    return template.render(context);
                };
            },
            prepare:  (options, next) => {

                let env = Nunjucks.configure(options.path, { watch: noCache, noCache: noCache });
                //env.addExtension('includeWith', new IncludeWith(env));
                //env.addExtension('with', new NunjucksTools.withTag(env));
                env.addExtension('withInclude', new NunjucksTools.includeWith(env));
                options.compileOptions.environment = env;

                if(theme.filters){
                    const keys = Object.keys(theme.filters)
                    keys.forEach((key) => {
                        if(env.filters[key] === undefined){
                            env.addFilter(key, theme.filters[key]);
                        }
                    })
                }

                return next();
            }
        }
        },
        isCached: false,
    });



    server.route([{
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, h) {
                return h.redirect('/waypointer/hub');
            }
        }
    },{
        method: 'GET',
        path: '/waypointer/hub',
        config: {
            handler: async (request, h) => {

                const theme = await getThemeData(request.server);
                let out = Hoek.clone(WaypointerJSON);
                out.theme = theme;
                out.theme.pathRoot = '/waypointer/hub'
                return h.view('hub-index.html', out);
            }
        }
    },
    {
        method: "GET",
        path: "/waypointer/hub/{group}",
        handler: async (request, h) => {

          const out = Hoek.clone(WaypointerJSON);
          out.theme = theme;
          out.theme.groupSelection = request.params.group;
          out.theme.pathRoot = "/waypointer/hub";
          return h.view("hub-group.html", out);
        }
    },
    {
        method: "GET",
        path: "/waypointer/hub/{group}/{item}",
        handler: async (request, h) => {
          const out = Hoek.clone(WaypointerJSON);
          out.theme = theme;
          out.theme.groupSelection = request.params.group;
          out.theme.itemSelection = request.params.item;
          out.theme.pathRoot = "/waypointer/hub";

          return h.view("hub-item.html", out);
        }
    },
    {
        method: 'GET',
        path: '/waypointer.json',
        config: {
            handler: async (request, h) => {

                const theme = await getThemeData(request.server);
                let out = Hoek.clone(WaypointerJSON);
                out.theme = theme;
                return h.response(out).type('application/json; charset=utf-8')
            }
        }
    },{
        method: 'GET',
        path: '/waypointer/assets/hub/{path*}',
        handler: {
            directory: {
                path: assetDirPath,
                listing: false,
                index: true
            }
        }
    }]);
})();

