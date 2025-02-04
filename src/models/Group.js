const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Group",
    tableName: "groups",
    columns: {
        id: { type: "int", primary: true, generated: true },
        name: { type: "varchar" },
        school_id: { type: "int" }
    },
    relations: {
        school: {
            target: "School",
            type: "many-to-one",
            joinColumn: { name: "school_id" }
        }
    }
});
