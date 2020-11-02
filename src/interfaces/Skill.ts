export interface Skill {
  className: string;
  descriptions: {
    body: string;
    className?: string;
  }[];
  introduction: string;
  knowledgeItemsOne: {
    name: string;
  }[];
  knowledgeItemsTwo: {
    name: string;
  }[];
  name: string;
}
