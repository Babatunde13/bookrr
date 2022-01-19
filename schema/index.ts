import apiSchema from './schema'
import query from './query'
import mutation from './mutation'

export const resolver = {
    ...query, ...mutation,
};

export const schema = apiSchema;
