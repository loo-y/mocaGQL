import { makeExecutableSchema } from '@graphql-tools/schema'
import Hello from './services/Hello'
import World from './services/World'

const typeDefinitionList = [World.typeDefinitions, Hello.typeDefinitions]
const resolverList = [World.resolvers, Hello.resolvers]
export const schema = makeExecutableSchema({
  resolvers: resolverList,
  typeDefs: typeDefinitionList
})