import { GraphQLClient } from "graphql-request";

const gql_client = new GraphQLClient("https://gql-sravesh.koyeb.app/",
{
    headers:{
        "secret":"hi"
    }
})

export {gql_client}