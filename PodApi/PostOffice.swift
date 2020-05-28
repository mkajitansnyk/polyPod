//
//  PostOffice.swift
//  PolyPod
//
//  Created by Carmen Burmeister on 27.05.20.
//  Copyright © 2020 polypoly. All rights reserved.
//

import UIKit

class PostOffice: NSObject {

    static let shared = PostOffice()
    
    func handleIncomingEvent(eventData: [String: Any], completionHandler: @escaping ([UInt8]) -> Void) {
        guard let bytes = eventData as? [String: NSNumber] else { return }
        
        let sortedBytes = bytes.sorted(by: { $0.0.compare($1.0, options: .numeric) == .orderedAscending })
        let bytesArray = Array(sortedBytes.map({ $0.value.uint8Value }))

        let data = Data(bytes: bytesArray, count: bytesArray.count)

        let unpacked = try! unpackAll(data)
        let unpackedDict = unpacked[0].dictionaryValue!

        let messageId = unpackedDict[MessagePackValue("id")]!
        let requestValue = unpackedDict[MessagePackValue("request")]!
        let request = requestValue.arrayValue!
        
        guard let api = request[0][MessagePackValue("method")] else {
            completionHandler([])
            return
        }

        if api == "polyOut" {
            handlePolyOut(messageId: messageId, request: request[1], completionHandler: { response in
                self.completeEvent(messageId: messageId, response: response, completionHandler: completionHandler)
            })
        }
    }
    
    private func completeEvent(messageId: MessagePackValue, response: MessagePackValue, completionHandler: @escaping ([UInt8]) -> Void) {
        var dict: [MessagePackValue: MessagePackValue] = [:]
        
        dict["id"] = messageId
        dict["response"] = response
        
        let packedDict = pack(MessagePackValue.map(dict))

        let byteArrayFromData: [UInt8] = [UInt8](packedDict)
        
        completionHandler(byteArrayFromData)
    }
    
    private func handlePolyOut(messageId: MessagePackValue, request: MessagePackValue, completionHandler: @escaping (MessagePackValue) -> Void) {
        let method = request[MessagePackValue("method")]
        
        if method == "fetch" {
            handlePolyOutFetch(messageId: messageId, request: request, completionHandler: completionHandler)
        }
    }
    
    private func handlePolyOutFetch(messageId: MessagePackValue, request: MessagePackValue, completionHandler: @escaping (MessagePackValue) -> Void) {
        let argsValue = request[MessagePackValue("args")]!
        let args = argsValue.arrayValue!
        
        let url = args[0].stringValue!

        PodApi.shared.polyOut.makeHttpRequest(urlString: url, requestData: [:]) { (data, response, error) in
            if let error = error {
                // todo: handle error
                completionHandler(MessagePackValue())
                return
            }
            guard let httpResponse = response as? HTTPURLResponse else {
                // todo: handle this
                completionHandler(MessagePackValue())
                return
            }
            
            var fetchResponse: [MessagePackValue] = []
            
            if let data = data {
                let responseString = String(data: data, encoding: .utf8)!
                fetchResponse.append(["bufferedText", .string(responseString)])
            }
            
            fetchResponse.append(["ok", true])
            fetchResponse.append(["redirected", false])
            fetchResponse.append(["status", .int(Int64(httpResponse.statusCode))])
            fetchResponse.append(["statusText", "OK"])
            fetchResponse.append(["type", "basic"])
            fetchResponse.append(["url", .string(httpResponse.url?.absoluteString ?? "")])
                                 
            let data = MessagePackValue.array(["@polypoly-eu/podigree.FetchResponse", .array(fetchResponse)])
                
            let packedData = pack(data)
                
            completionHandler(MessagePackValue(type: 2, data: packedData))
        }
    }
}
