export class Comment {
  _id?: string;
  userId: string;
  candidateId: string;
  content: string;
  createdAt: Date;

  constructor(
    userId: string,
    candidateId: string,
    content: string,
    createdAt: Date = new Date()
  ) {
    this.userId = userId;
    this.candidateId = candidateId;
    this.content = content;
    this.createdAt = createdAt;
  }
}
