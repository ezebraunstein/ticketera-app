/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRRPP = /* GraphQL */ `
  subscription OnCreateRRPP($filter: ModelSubscriptionRRPPFilterInput) {
    onCreateRRPP(filter: $filter) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRRPP = /* GraphQL */ `
  subscription OnUpdateRRPP($filter: ModelSubscriptionRRPPFilterInput) {
    onUpdateRRPP(filter: $filter) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRRPP = /* GraphQL */ `
  subscription OnDeleteRRPP($filter: ModelSubscriptionRRPPFilterInput) {
    onDeleteRRPP(filter: $filter) {
      id
      nameRRPP
      surnameRRPP
      dniRRPP
      emailRRPP
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onCreatePayment(filter: $filter) {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onUpdatePayment(filter: $filter) {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onDeletePayment(filter: $filter) {
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
export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onCreateTicket(filter: $filter) {
      id
      qrTicket
      validTicket
      dniTicket
      emailTicket
      typeticketID
      RRPP {
        id
        nameRRPP
        surnameRRPP
        dniRRPP
        emailRRPP
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      ticketRRPPId
    }
  }
`;
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onUpdateTicket(filter: $filter) {
      id
      qrTicket
      validTicket
      dniTicket
      emailTicket
      typeticketID
      RRPP {
        id
        nameRRPP
        surnameRRPP
        dniRRPP
        emailRRPP
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      ticketRRPPId
    }
  }
`;
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket($filter: ModelSubscriptionTicketFilterInput) {
    onDeleteTicket(filter: $filter) {
      id
      qrTicket
      validTicket
      dniTicket
      emailTicket
      typeticketID
      RRPP {
        id
        nameRRPP
        surnameRRPP
        dniRRPP
        emailRRPP
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      ticketRRPPId
    }
  }
`;
export const onCreateTypeTicket = /* GraphQL */ `
  subscription OnCreateTypeTicket(
    $filter: ModelSubscriptionTypeTicketFilterInput
  ) {
    onCreateTypeTicket(filter: $filter) {
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
          ticketRRPPId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTypeTicket = /* GraphQL */ `
  subscription OnUpdateTypeTicket(
    $filter: ModelSubscriptionTypeTicketFilterInput
  ) {
    onUpdateTypeTicket(filter: $filter) {
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
          ticketRRPPId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTypeTicket = /* GraphQL */ `
  subscription OnDeleteTypeTicket(
    $filter: ModelSubscriptionTypeTicketFilterInput
  ) {
    onDeleteTypeTicket(filter: $filter) {
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
          ticketRRPPId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
