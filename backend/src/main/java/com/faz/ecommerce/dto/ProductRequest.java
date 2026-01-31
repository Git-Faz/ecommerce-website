package com.faz.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import jakarta.validation.constraints.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductRequest {

    private Long id;

    @NotBlank(message = "Product name is required")
    private String name;
    
    @Size(max = 500, message = "Description too long")
    private String description;

    private Set<String> categories;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Long price;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private int stock;
    private String imageUrl;

}
