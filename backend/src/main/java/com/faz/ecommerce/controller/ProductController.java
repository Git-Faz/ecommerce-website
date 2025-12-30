package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.ApiResponse;
import com.faz.ecommerce.dto.ProductRequest;
import com.faz.ecommerce.entity.Product;
import com.faz.ecommerce.repository.ProductRepo;
import com.faz.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> showAllProducts (){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping(params = "name")
    public ResponseEntity<List<Product>> getProductByName (@RequestParam String name){
        return ResponseEntity.ok(productService.getProductsByName(name));
    }

    @PostMapping("/new-product")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<ApiResponse<Product>> addSingleProduct(@Valid @RequestBody ProductRequest request){
        Product product = productService.addSingleProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Product created successfully", product));
    }

    @PatchMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<ApiResponse<Product>> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request){
        Product updatedProduct = productService.updateProduct(id,request);
        return ResponseEntity.ok(new ApiResponse<>("Product updated successfully"));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id){
         productService.deleteProduct(id);
        return ResponseEntity.ok(new ApiResponse<>("Product deleted successfully"));
    }

    @GetMapping(params = "categories")
    public ResponseEntity<List<Product>> showProductsByCategory(@RequestParam Set<String> categories) {
        return ResponseEntity.ok(productService.getProductByCategory(categories));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

}
