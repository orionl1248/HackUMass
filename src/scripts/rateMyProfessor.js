import {GraphQLClient, gql} from 'graphql-request';
import fetch from 'isomorphic-fetch';

const schoolID = "U2Nob29sLTE1MTM="; // UMass
const departmentID = "RGVwYXJ0bWVudC0xMQ=="; // Computer Science

const AUTH_TOKEN = 'dGVzdDp0ZXN0';

const client = new GraphQLClient('https://www.ratemyprofessors.com/graphql', {
  headers: {
    authorization: `Basic ${AUTH_TOKEN}`
  },
  fetch
});

const getDepartmentPaginationQuery = gql`
query TeacherSearchPaginationQuery(
  $count: Int!
  $cursor: String
  $query: TeacherSearchQuery!
) {
  search: newSearch {
    ...TeacherSearchPagination_search_1jWD3d
  }
}

fragment TeacherSearchPagination_search_1jWD3d on newSearch {
  teachers(query: $query, first: $count, after: $cursor) {
    didFallback
    edges {
      cursor
      node {
      avgRating
      firstName
      lastName
        id
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    resultCount
    filters {
      field
      options {
        value
        id
      }
    }
  }
}

`;

const getDepartmentFirstPageQuery = gql`
query TeacherSearchResultsPageQuery(
  $query: TeacherSearchQuery!
  $schoolID: ID
) {
  search: newSearch {
    ...TeacherSearchPagination_search_1ZLmLD
  }
  school: node(id: $schoolID) {
    __typename
    ... on School {
      name
    }
    id
  }
}

fragment TeacherSearchPagination_search_1ZLmLD on newSearch {
  teachers(query: $query, first: 100, after: "") {
    didFallback
    edges {
      cursor
      node {
        avgRating
        department
        firstName
        lastName
        id
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    resultCount
    filters {
      field
      options {
        value
        id
      }
    }
  }
}
`;

export default async function getPeople() {
  const variables = {
    "query": {
      "text": "",
      "schoolID": schoolID,
      "fallback": true,
      "departmentID": departmentID 
    },
    "schoolID": schoolID
  }

  const response = await client.request(getDepartmentFirstPageQuery, variables);

  var hasNextPage = response.search.teachers.pageInfo.hasNextPage;
  while (hasNextPage === true) {
    const cursor = response.search.teachers.pageInfo.endCursor;
    const pagination_variables = {
      "count": 100,
      "cursor": cursor,
      "query": {
          "text": "",
          "schoolID": variables.schoolID,
          "fallback": true,
          "departmentID": departmentID
      }
    }
    const newResponse = await client.request(getDepartmentPaginationQuery, pagination_variables);
    response.search.teachers.edges = [...response.search.teachers.edges, ...newResponse.search.teachers.edges];
    response.search.teachers.pageInfo = newResponse.search.teachers.pageInfo;
    hasNextPage = newResponse.search.teachers.pageInfo.hasNextPage;
  }

  return response.search.teachers.edges;
}
