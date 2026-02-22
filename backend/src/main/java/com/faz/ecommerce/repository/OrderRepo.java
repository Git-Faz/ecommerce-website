package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.Order;
import com.faz.ecommerce.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    Page<Order> findByUserId (Long userId, Pageable pageable);

    Order getOrderById(Long orderId);
}
