package com.faz.ecommerce.repository;

import com.faz.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Product findProductByName(String name);
    Product findProductById(Long id);

    List<Product> findByNameContainingIgnoreCase(String keyword);
    List<Product> findByCategoriesIn(Set<String> categories);
    
    boolean existsProductById(Long id);
    boolean existsByNameIgnoreCase(String name);
    boolean existsProductByIdAndNameIgnoreCase(Long id, String name);

    Product deleteProductById(Long id);

}
