export interface UsersModel {
  email: string,
  id: number,
  name: string,
  phone: string,
  username: string,
  website: string,
  company: CompanyModel,
  address: AddressModel
}

export interface CompanyModel {
  bs: string,
  catchPhrase: string,
  name: string
}

export interface AddressModel {
  city: string,
  geo: {
    lat: string,
    lng: string
  },
  street: string,
  suite: string,
  zipcode: string
}
