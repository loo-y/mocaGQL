import { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import Hello from './Hello'
import Liber3 from './Liber3'
import Link from './Link'
import Book123 from './Book123'
import BookSummary from './BookSummary'

const serviceList = [BookSummary, Liber3, Link, Book123]

export default {
    typeDefinitions: serviceList.map(service => service.typeDefinitions),
    resolverList: serviceList.map(service => service.resolvers) as IExecutableSchemaDefinition['resolvers'],
}
