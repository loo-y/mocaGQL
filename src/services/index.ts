import { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import Hello from './Hello'
import World from './World'
import Link from './Link'

const serviceList = [Hello, World, Link]

export default {
    typeDefinitions: serviceList.map(service => service.typeDefinitions),
    resolverList: serviceList.map(service => service.resolvers) as IExecutableSchemaDefinition['resolvers'],
}
