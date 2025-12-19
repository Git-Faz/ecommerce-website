package com.faz.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductRequest {

    private Long id;
    private String name;
    private String description;
    private Set<String> categories;
    private Long price;
    private int stock;
    private String imageUrl;

}
