export class Vote {
    _id?: string;
    userId: string;
    candidateId: string;
    electionId: string;
    createdAt: Date;
    
        constructor(
        userId: string,
        candidateId: string,
        electionId: string,
        createdAt: Date
        ) {
        this.userId = userId;
        this.candidateId = candidateId;
        this.electionId = electionId;
        this.createdAt = createdAt;
        }
    }
    