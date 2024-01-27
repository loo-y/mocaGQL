import { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import Hello from './Hello'
import Liber3 from './Liber3'
import Link from './Link'

const serviceList = [Hello, Liber3, Link]

export default {
    typeDefinitions: serviceList.map(service => service.typeDefinitions),
    resolverList: serviceList.map(service => service.resolvers) as IExecutableSchemaDefinition['resolvers'],
}
