package com.anthonyvalle.BBStoreLocatorApp.Services;

import com.anthonyvalle.BBStoreLocatorApp.Exceptions.ModelExceptions.BusinessModelException;
import com.anthonyvalle.BBStoreLocatorApp.Models.BusinessModel.Business;
import com.anthonyvalle.BBStoreLocatorApp.Repos.BusinessRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BusinessService {

    private BusinessRepo repo;

    @Autowired
    public BusinessService(BusinessRepo repo) {
        this.repo = repo;
    }

    public List<Business> getAll() {
        return repo.findAll();
    }

    public Business findById(String id){
        long bID = parseId(id);
        return repo.findById(bID).orElseThrow(()-> new BusinessModelException("Business not found"));
    }

    public Business updateById(String id, Business business){
        long bID = parseId(id);
        if (!repo.existsById(bID)) {
            throw new BusinessModelException("Business not found");
        }
        Business dbModel = repo.getOne(bID);
        BeanUtils.copyProperties(business,dbModel,"id");
        return repo.saveAndFlush(dbModel);
    }

    public Map<String,String> deleteById(String id){
        Map returnItem= new HashMap<String,String> ();
        long bID = parseId(id);
        if (!repo.existsById(bID)) {
            throw new BusinessModelException("Business not found");
        }
        repo.deleteById(bID);
        returnItem.put("id:",id);
        returnItem.put("Message", "Business successfully Removed");
        return returnItem;
    }

    public Business createBusiness(Business business){
        if (business == null || business.getAddress().isEmpty() ){
            throw new BusinessModelException("Not a valid business entity, please fix validation errors");
        }
        return repo.saveAndFlush(business);
    }

    private long parseId(String id){
        return Long.parseLong(id);
    }
}
