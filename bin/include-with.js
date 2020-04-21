var Nunjucks = require('nunjucks');

module.exports = function includeWith(env)  {
    this.tags = ['includeWith'];

    this.parse = function (parser, nodes) {
        const token = parser.nextToken();

        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(token.value);

        if (args.children.length > 0) {
            return new nodes.CallExtension(this, 'tagFound', args);
        }
    };

    this.tagFound = function (context, path, args = {}, { useContext = false } = {} ) {
        var data = {}
        if (args.with) {
            data = args.with;
        }
        const composedData = useContext ? Object.assign({}, context.ctx, data) : data;
        return new Nunjucks.runtime.SafeString(env.render(path, composedData));
    }
}