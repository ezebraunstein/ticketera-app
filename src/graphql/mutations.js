/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTicket = /* GraphQL */ `
  mutation CreateTicket(
    $input: CreateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    createTicket(input: $input, condition: $condition) {
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
export const updateTicket = /* GraphQL */ `
  mutation UpdateTicket(
    $input: UpdateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    updateTicket(input: $input, condition: $condition) {
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
export const deleteTicket = /* GraphQL */ `
  mutation DeleteTicket(
    $input: DeleteTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    deleteTicket(input: $input, condition: $condition) {
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
export const createTypeTicket = /* GraphQL */ `
  mutation CreateTypeTicket(
    $input: CreateTypeTicketInput!
    $condition: ModelTypeTicketConditionInput
  ) {
    createTypeTicket(input: $input, condition: $condition) {
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
export const updateTypeTicket = /* GraphQL */ `
  mutation UpdateTypeTicket(
    $input: UpdateTypeTicketInput!
    $condition: ModelTypeTicketConditionInput
  ) {
    updateTypeTicket(input: $input, condition: $condition) {
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
export const deleteTypeTicket = /* GraphQL */ `
  mutation DeleteTypeTicket(
    $input: DeleteTypeTicketInput!
    $condition: ModelTypeTicketConditionInput
  ) {
    deleteTypeTicket(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
