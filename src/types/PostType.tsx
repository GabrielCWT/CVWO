type PostType = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Title: string;
    Content: string;
    Category: string;
    Username: string;
    UserID: number;
};

export default PostType;
