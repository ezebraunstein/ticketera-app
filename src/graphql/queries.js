/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      cart
      paymentStatus
      emailBuyer
      dniBuyer
      amount
      eventName
      createdAt
      updatedAt
      eventID
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cart
        paymentStatus
        emailBuyer
        dniBuyer
        amount
        eventName
        createdAt
        updatedAt
        eventID
      }
      nextToken
    }
  }
`;
export const paymentsByEventID = /* GraphQL */ `
  query PaymentsByEventID(
    $eventID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsByEventID(
      eventID: $eventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cart
        paymentStatus
        emailBuyer
        dniBuyer
        amount
        eventName
        createdAt
        updatedAt
        eventID
      }
      nextToken
    }
  }
`;
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
      nameLocationEvent
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
      Payments {
        items {
          id
          cart
          paymentStatus
          emailBuyer
          dniBuyer
          amount
          eventName
          createdAt
          updatedAt
          eventID
        }
        nextToken
      }
      userID
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
        nameLocationEvent
        TypeTickets {
          nextToken
        }
        Payments {
          nextToken
        }
        userID
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
        nameLocationEvent
        TypeTickets {
          nextToken
        }
        Payments {
          nextToken
        }
        userID
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
          nameLocationEvent
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
