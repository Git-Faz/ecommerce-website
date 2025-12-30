package com.faz.ecommerce.dto;

import com.faz.ecommerce.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class OrderResponse {
    private Long id;
    //private Long userId;
    private List<CartItemResponse> items;
    private Long totalAmount;
    private OrderStatus status;
}
