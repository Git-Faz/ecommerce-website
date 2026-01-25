package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.ApiResponse;
import com.faz.ecommerce.dto.OrderResponse;
import com.faz.ecommerce.entity.Order;
import com.faz.ecommerce.enums.OrderStatus;
import com.faz.ecommerce.repository.OrderRepo;
import com.faz.ecommerce.security.CustomUserDetails;
import com.faz.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepo orderRepo;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder (Authentication authentication){

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        Order newOrder = orderService.createOrderFromCart(user.getId());
        OrderResponse response = orderService.mapToOrderResponse(newOrder);
        return ResponseEntity.ok(new ApiResponse<>("Order Placed!",response));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById (@PathVariable Long orderId){
        Order order = orderRepo.getOrderById(orderId);
        OrderResponse response = orderService.mapToOrderResponse(order);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getUserOrders (Authentication authentication){

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        List <Order> orders = orderService.getUserOrders(user.getId());
        List<OrderResponse> responses = orders.stream()
                .map(order -> orderService.mapToOrderResponse(order))
                .toList();
        return ResponseEntity.ok(new ApiResponse<>("Your orders",responses));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<Order>> updateStatus(@PathVariable Long orderId,
                                                           @RequestParam OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(new ApiResponse<>("Status updated", updatedOrder));
    }

}
