import { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import Liber3 from './Liber3'
import Book123 from './Book123'
import BookSummary from './BookSummary'

const serviceList = [BookSummary, Liber3, Book123]

export default {
    typeDefinitions: serviceList.map(service => service.typeDefinitions),
    resolverList: serviceList.map(service => service.resolvers) as IExecutableSchemaDefinition['resolvers'],
}
