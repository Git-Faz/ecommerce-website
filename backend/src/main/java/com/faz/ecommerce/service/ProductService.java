package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.ProductRequest;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;

    public List<Product> getAllProducts(){
       var products = productRepo.findAll();
        if(products.isEmpty()){
            throw new RuntimeException("There are no products!");
        }
        return products;
    }

    public List<Product> getProductsByName(String name){
        List<Product> products = productRepo.findByNameContainingIgnoreCase(name);
        if(products.isEmpty()){
            throw new RuntimeException("Product doesn't exist");
        }
        return products;
    }

    public Product addSingleProduct (ProductRequest request ){
        if (productRepo.existsByNameIgnoreCase( "this product already exists")){
            throw new RuntimeException("Product already exists");
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setCategories(request.getCategories());
        product.setImageUrl(request.getImageUrl());

       return productRepo.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request){
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Item Not found"));

        if (request.getName() != null) p.setName(request.getName());
        if (request.getDescription() != null) p.setDescription(request.getDescription());
        if (request.getPrice() != null) p.setPrice(request.getPrice());
        if (request.getImageUrl() != null) p.setImageUrl(request.getImageUrl());

        return productRepo.save(p);

    }

    public void deleteProduct(Long id){
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        productRepo.delete(p);
    }

    public List<Product> getProductByCategory(Set<String> categories) {
        List<Product> products = productRepo.findByCategoriesIn(categories);
        if(products.isEmpty()){
            throw new RuntimeException("There are no products in this category");
        }
        return products;
    }

    public Product getProductById(Long id){
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product doesn't exist"));
    }



}
