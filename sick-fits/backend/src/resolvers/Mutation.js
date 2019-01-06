const Mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        const item = await ctx.db.mutation.createItem(
            {
                data: { ...args }
            },
            info
        );

        return item;
    },
    updateItem(parent, args, ctx, info) {
        // take a copy of the updates
        const updates = { ...args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                }
            },
            info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. find item
        const item = await ctx.db.query.item({ where }, `{ id title }`);
        // 2. check if they have permission to delete item
        // TODO: check if we own it
        // 3. delete the item
        return ctx.db.mutation.deleteItem({ where }, info);
    }
};

module.exports = Mutations;
