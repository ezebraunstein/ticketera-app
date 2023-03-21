/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTicket = /* GraphQL */ `
  query GetTicket($id: ID!) {
    getTicket(id: $id) {
      id
      qrTicket
      validTicket
      dniTicket
      emailTicket
      typeticketID
      createdAt
      updatedAt
    }
  }
`;
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        qrTicket
        validTicket
        dniTicket
        emailTicket
        typeticketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ticketsByTypeticketID = /* GraphQL */ `
  query TicketsByTypeticketID(
    $typeticketID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ticketsByTypeticketID(
      typeticketID: $typeticketID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        qrTicket
        validTicket
        dniTicket
        emailTicket
        typeticketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTypeTicket = /* GraphQL */ `
  query GetTypeTicket($id: ID!) {
    getTypeTicket(id: $id) {
      id
      nameTT
      priceTT
      quantityTT
      descriptionTT
      activeTT
      startDateTT
      endDateTT
      upDateTT
      downDateTT
      eventID
      Tickets {
        items {
          id
          qrTicket
          validTicket
          dniTicket
          emailTicket
          typeticketID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTypeTickets = /* GraphQL */ `
  query ListTypeTickets(
    $filter: ModelTypeTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTypeTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nameTT
        priceTT
        quantityTT
        descriptionTT
        activeTT
        startDateTT
        endDateTT
        upDateTT
        downDateTT
        eventID
        Tickets {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const typeTicketsByEventID = /* GraphQL */ `
  query TypeTicketsByEventID(
    $eventID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTypeTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    typeTicketsByEventID(
      eventID: $eventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nameTT
        priceTT
        quantityTT
        descriptionTT
        activeTT
        startDateTT
        endDateTT
        upDateTT
        downDateTT
        eventID
        Tickets {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      nameEvent
      locationEvent
      descriptionEvent
      bannerEvent
      miniBannerEvent
      startDateE
      endDateE
      upDateE
      downDateE
      userID
      TypeTickets {
        items {
          id
          nameTT
          priceTT
          quantityTT
          descriptionTT
          activeTT
          startDateTT
          endDateTT
          upDateTT
          downDateTT
          eventID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nameEvent
        locationEvent
        descriptionEvent
        bannerEvent
        miniBannerEvent
        startDateE
        endDateE
        upDateE
        downDateE
        userID
        TypeTickets {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByUserID = /* GraphQL */ `
  query EventsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nameEvent
        locationEvent
        descriptionEvent
        bannerEvent
        miniBannerEvent
        startDateE
        endDateE
        upDateE
        downDateE
        userID
        TypeTickets {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      nameUser
      surnameUser
      dniUser
      emailUser
      aliasUser
      Events {
        items {
          id
          nameEvent
          locationEvent
          descriptionEvent
          bannerEvent
          miniBannerEvent
          startDateE
          endDateE
          upDateE
          downDateE
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nameUser
        surnameUser
        dniUser
        emailUser
        aliasUser
        Events {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
