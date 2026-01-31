package com.faz.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AddToCartRequest {
    private Long productId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity cannot be negative")
    private Integer quantity;
}