package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.Order;
import com.faz.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {

    List<Order> findByUserId (Long userId);

    Order getOrderById(Long orderId);
}
