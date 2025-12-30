package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.CartItem;
import com.faz.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepo extends JpaRepository <CartItem, Long> {

    List<CartItem> findByUserId (Long id);
    Optional<CartItem> findByUserIdAndProductId (Long userId, Long productId);
    void deleteByUserId (Long userId);

    Long user(User user);
}
