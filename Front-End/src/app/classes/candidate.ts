export class Candidate {
  _id?: string;
  name: string;
  party: string;
  biography: string;
  program: string;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;



  constructor(
    name: string,
    party: string,
    biography: string,
    program: string,
    photoUrl?: string,

  ) {
    this.name = name;
    this.party = party;
    this.biography = biography;
    this.program = program;
    this.photoUrl = photoUrl;

  }
}
