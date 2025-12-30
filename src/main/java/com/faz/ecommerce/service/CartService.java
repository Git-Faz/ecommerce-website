package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.CartItemResponse;
import com.faz.ecommerce.entity.CartItem;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.entity.User;
import com.faz.ecommerce.repository.CartItemRepo;
import com.faz.ecommerce.repository.ProductRepo;
import com.faz.ecommerce.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class CartService {

    private final UserRepo userRepo;
    private final CartItemRepo cartItemRepo;
    private final ProductRepo productRepo;

    public CartItem addToCart(Long userId, Long productId, int quantity){
        User user = userRepo.findById(userId).
                orElseThrow(() -> new RuntimeException("User Doesnt Exist"));

        Product product = productRepo.findById(productId).
                orElseThrow(() -> new RuntimeException("Product doesnt exist"));

        Optional<CartItem> existingItem = cartItemRepo.findByUserIdAndProductId(userId,productId);

        if(existingItem.isPresent()){
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepo.save(item);
        }

        CartItem newItem = new CartItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);

        return cartItemRepo.save(newItem);
    }

    public List<CartItem> getCartItems(Long userId){
        return cartItemRepo.findByUserId(userId);
    }

    public CartItem updateQuantity (Long userId, Long productId, int quantity) {
        CartItem item = cartItemRepo.findByUserIdAndProductId(userId, productId).
                orElseThrow(() -> new RuntimeException("Item not found"));

        if(quantity <= 0) throw new IllegalArgumentException("Quantity must be greater than zero");

        item.setQuantity(quantity);
        return cartItemRepo.save(item);
    }

    public void clearCart (Long userId){
        cartItemRepo.deleteByUserId(userId);
    }

    public void removeItem (Long cartItemId){
        if (!cartItemRepo.existsById(cartItemId)) {
            throw new RuntimeException("Cart item not found");
        }
        cartItemRepo.deleteById(cartItemId);
    }

    // In CartService.java
    public CartItemResponse mapToCartResponse(CartItem item) {
        return new CartItemResponse(
                item.getId(),
                item.getUser().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice(),
                item.getProduct().getImageUrl(),
                item.getQuantity(),
                item.getProduct().getPrice() * item.getQuantity()
        );
    }


}
