export function saveCartIntent(productId: number, quantity = 1) {
    localStorage.setItem(
        "pendingCartItem",
        JSON.stringify({ productId, quantity })
    );
}

export function consumeCartIntent() {
    const item = localStorage.getItem("pendingCartItem");
    if (!item) return null;

    localStorage.removeItem("pendingCartItem");
    return JSON.parse(item);
}
