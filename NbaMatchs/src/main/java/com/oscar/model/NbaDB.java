package com.oscar.model;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;

public class NbaDB {
	private MongoClient client;
	private MongoDatabase db;
	public NbaDB() { //Constructor of the class
		this.client = new MongoClient();
		this.db = client.getDatabase("nba");
	}
	
	public MongoCollection<Document> getCollection(String collection_name){
		return this.db.getCollection(collection_name);
	}
	public void insert(Document document) {
		this.db.getCollection("team").insertOne(document);
	}
}
