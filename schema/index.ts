import apiSchema from './schema.js'
import query from './query.js'
import mutation from './mutation.js'

export const resolver = {
    ...query, ...mutation,
};

export const schema = apiSchema;
