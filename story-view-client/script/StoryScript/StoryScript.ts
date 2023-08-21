export interface StoryScript {
    appear( callback? :()=>void) : void;
    disappear( callback? :()=>void) : void;
}