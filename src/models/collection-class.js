'use strict';


class Collection {
    constructor(model) {
        this.model = model;
    }

    create = async (json) => {
        try {
            let record = await this.model.create(json)
            return record
        } catch (err) {
            console.error(err)
        }
    }

    read = async (id, options = {}) => {
        try {
            let records = null;
            if (id) {
                options['where'] = { id: id }
                records = await this.model.findOne();

            } else {
                records = await this.model.findAll();
            }
            return records
        } catch (err) {
            console.error(err)
        }
    }


    update = async (id, json) => {
        try {
            if (!id) throw new Error('No id provided');
            let record = await this.model.findOne({ where: { id: id } })
            let updatedRecord = await record.update(json)
            return updatedRecord;
        } catch (err) {
            console.error(err)
        }
    }

    delete = async (id) => {
        try {
            if (!id) throw new Error('No id provided');
            let deletedRecord = await this.model.destroy({ where: { id: id } })
            return (`deleted record of id ${id}`)
        } catch (err) {
            console.error(err)
        }
    }

}

module.exports = Collection;