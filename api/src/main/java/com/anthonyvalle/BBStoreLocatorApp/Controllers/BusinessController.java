package com.anthonyvalle.BBStoreLocatorApp.Controllers;

import com.anthonyvalle.BBStoreLocatorApp.Models.BusinessModel.Business;
import com.anthonyvalle.BBStoreLocatorApp.Services.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/business/")
public class BusinessController {

    private BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public List<Business> getAllBusinesses(){
        return businessService.getAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable String id){
        return new ResponseEntity<Business>(businessService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Business> postBusiness(@Validated @RequestBody Business business){
        return new ResponseEntity<Business>(businessService.createBusiness(business), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Business> updateBusiness(@PathVariable String id, @Validated @RequestBody Business business){
        return new ResponseEntity<Business>(businessService.updateById(id,business), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Map> deleteBusiness(@PathVariable String id){
        return new ResponseEntity<Map>(businessService.deleteById(id), HttpStatus.OK);
    }

}
