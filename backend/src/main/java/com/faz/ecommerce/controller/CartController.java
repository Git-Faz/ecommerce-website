package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.ApiResponse;
import com.faz.ecommerce.dto.CartItemResponse;
import com.faz.ecommerce.entity.CartItem;
import com.faz.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> showCartItems() {
        List<CartItem> items = cartService.getCartItems();
        List<CartItemResponse> responses = items.stream()
                .map(item -> cartService.mapToCartResponse(item))
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartItemResponse>> addItem(@RequestParam Long productId,
            @RequestParam int quantity, Authentication auth) {
        CartItem item = cartService.addToCart(productId, quantity);
        CartItemResponse response = cartService.mapToCartResponse(item);
        return ResponseEntity.ok(new ApiResponse<>("Item added to cart", response));
    }

    @PatchMapping("/update")
    public ResponseEntity<ApiResponse<CartItemResponse>> updateQuantity(@RequestParam Long productId,
            @RequestParam int quantity) {
        CartItem item = cartService.updateQuantity(productId, quantity);
        CartItemResponse response = cartService.mapToCartResponse(item);
        return ResponseEntity.ok(new ApiResponse<>("Quantity updated", response));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}
