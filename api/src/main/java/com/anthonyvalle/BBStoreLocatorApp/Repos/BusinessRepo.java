package com.anthonyvalle.BBStoreLocatorApp.Repos;

import com.anthonyvalle.BBStoreLocatorApp.Models.BusinessModel.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepo extends JpaRepository<Business, Long> {
}
