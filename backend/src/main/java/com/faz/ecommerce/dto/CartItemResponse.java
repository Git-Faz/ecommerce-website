package com.faz.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CartItemResponse {
    private Long id;
    private Long userId;  // Just ID, not full object
    private String productName;
    private Long productPrice;
    private String productImageUrl;
    private int quantity;
    private Long totalPrice;

    public CartItemResponse(Long id, String productName, Long productPrice, String productImageUrl, int quantity, Long totalPrice) {
        this.id = id;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImageUrl = productImageUrl;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
