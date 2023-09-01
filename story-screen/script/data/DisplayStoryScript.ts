export interface DisplayStoryScript{
    left : {
        text :string;
    }

    right : {
        text :string;
    }
    /**
     * update
     * unix time (second)
     */
    update :number;

    type: "end"|"";
}