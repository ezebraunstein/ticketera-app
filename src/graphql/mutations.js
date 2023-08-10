/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRRPPEvent = /* GraphQL */ `
  mutation CreateRRPPEvent(
    $input: CreateRRPPEventInput!
    $condition: ModelRRPPEventConditionInput
  ) {
    createRRPPEvent(input: $input, condition: $condition) {
      id
      Event {
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
      }
      totalSold
      rrppID
      Tickets {
        items {
          id
          qrTicket
          validTicket
          dniTicket
          emailTicket
          typeticketID
          rrppeventID
        }
        nextToken
      }
      rRPPEventEventId
    }
  }
`;
export const updateRRPPEvent = /* GraphQL */ `
  mutation UpdateRRPPEvent(
    $input: UpdateRRPPEventInput!
    $condition: ModelRRPPEventConditionInput
  ) {
    updateRRPPEvent(input: $input, condition: $condition) {
      id
      Event {
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
      }
      totalSold
      rrppID
      Tickets {
        items {
          id
          qrTicket
          validTicket
          dniTicket
          emailTicket
          typeticketID
          rrppeventID
        }
        nextToken
      }
      rRPPEventEventId
    }
  }
`;
export const deleteRRPPEvent = /* GraphQL */ `
  mutation DeleteRRPPEvent(
    $input: DeleteRRPPEventInput!
    $condition: ModelRRPPEventConditionInput
  ) {
    deleteRRPPEvent(input: $input, condition: $condition) {
      id
      Event {
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
      }
      totalSold
      rrppID
      Tickets {
        items {
          id
          qrTicket
          validTicket
          dniTicket
          emailTicket
          typeticketID
          rrppeventID
        }
        nextToken
      }
      rRPPEventEventId
    }
  }
`;
export const createRRPP = /* GraphQL */ `
  mutation CreateRRPP(
    $input: CreateRRPPInput!
    $condition: ModelRRPPConditionInput
  ) {
    createRRPP(input: $input, condition: $condition) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      RRPPEvents {
        items {
          id
          totalSold
          rrppID
          rRPPEventEventId
        }
        nextToken
      }
    }
  }
`;
export const updateRRPP = /* GraphQL */ `
  mutation UpdateRRPP(
    $input: UpdateRRPPInput!
    $condition: ModelRRPPConditionInput
  ) {
    updateRRPP(input: $input, condition: $condition) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      RRPPEvents {
        items {
          id
          totalSold
          rrppID
          rRPPEventEventId
        }
        nextToken
      }
    }
  }
`;
export const deleteRRPP = /* GraphQL */ `
  mutation DeleteRRPP(
    $input: DeleteRRPPInput!
    $condition: ModelRRPPConditionInput
  ) {
    deleteRRPP(input: $input, condition: $condition) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      RRPPEvents {
        items {
          id
          totalSold
          rrppID
          rRPPEventEventId
        }
        nextToken
      }
    }
  }
`;
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
      cart
      paymentStatus
      emailBuyer
      dniBuyer
      amount
      eventName
      createdDate
      updatedDate
      eventID
    }
  }
`;
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
      id
      cart
      paymentStatus
      emailBuyer
      dniBuyer
      amount
      eventName
      createdDate
      updatedDate
      eventID
    }
  }
`;
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
      id
      cart
      paymentStatus
      emailBuyer
      dniBuyer
      amount
      eventName
      createdDate
      updatedDate
      eventID
    }
  }
`;
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
      rrppeventID
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
      rrppeventID
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
      rrppeventID
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
          rrppeventID
        }
        nextToken
      }
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
          rrppeventID
        }
        nextToken
      }
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
          rrppeventID
        }
        nextToken
      }
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
          createdDate
          updatedDate
          eventID
        }
        nextToken
      }
      userID
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
          createdDate
          updatedDate
          eventID
        }
        nextToken
      }
      userID
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
          createdDate
          updatedDate
          eventID
        }
        nextToken
      }
      userID
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
    }
  }
`;
