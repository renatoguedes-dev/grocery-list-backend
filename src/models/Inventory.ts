export interface Inventory {
    id: string;
    user_id: string;
    item: string;
    current_amount: number;
    minimum_amount: number;
    created_at: Date;
}

export interface InventoryDto {
    userId: string;
    item: string;
    currentAmount: number;
    minimumAmount: number;
}

export interface InventoryUpdate {
    userId: string;
    itemId: string;
    currentAmount: number;
    minimumAmount: number;
}