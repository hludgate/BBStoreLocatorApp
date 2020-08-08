package com.anthonyvalle.BBStoreLocatorApp.Services;

import com.anthonyvalle.BBStoreLocatorApp.Models.BusinessModel.Business;
import com.anthonyvalle.BBStoreLocatorApp.Repos.BusinessRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {

    private BusinessRepo repo;

    @Autowired
    public BusinessService(BusinessRepo repo) {
        this.repo = repo;
    }

    public List<Business> getAll() {
        //todo:
        return null;
    }

    public Business findById(String id){
        //todo
        return null;
    }

    public Business updateById(String id, Business business){
        //todo
        return null;
    }

    public String deleteById(String id){
        //todo
        return null;
    }

    public Business createBusiness(Business business){
        //todo
        return null;
    }
}
