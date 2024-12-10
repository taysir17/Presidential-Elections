export class Election {
    _id?: string;
    title: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    candidates: string[];  // List of Candidate IDs
    createdAt: Date;
    voteCount: number = 0;  // Initialize with a default value

    
        constructor(
        title: string,
        startDate: Date,
        endDate: Date,
        isActive: boolean = true,
        candidates: string[] = [],
        createdAt: Date = new Date()
        ) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.candidates = candidates;
        this.createdAt = createdAt;
        }
    }
    