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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTickets = /* GraphQL */ `
  query SyncTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTypeTickets = /* GraphQL */ `
  query SyncTypeTickets(
    $filter: ModelTypeTicketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTypeTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nameUser
        surnameUser
        dniUser
        emailUser
        aliasUser
        Events {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
