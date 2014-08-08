var rangeProto = {
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100
};

describe("generateIdentificator", function() {
  it("should be good", function() {
    expect(SD.generateIdentificator()).toBeGoodId();
  });
  it("if one generates two, they should be different", function() {
    var id1 = SD.generateIdentificator();
    var id2 = SD.generateIdentificator();
    expect(id1).not.toBe(id2);
  });
  it("and if one generates 10000, as well", function() {
    var ids=[];
    for (var i=0;i<10000;i++) {
      id = SD.generateIdentificator();
      ids.push(id);
    }
    expect(ids).toHaveDistinctValues();
  });
});

describe("rangeMaker", function() {
  var range;
  var rangeSpec={xMin: -100, xMax: 200, yMin: 50, yMax: 150};
  describe("rangeMaker()", function() {
    it("it should be "+JSON.stringify(rangeProto), function() {
      range=SD.rangeMaker();
      expect(range).toBeExtensionOf(rangeProto);
    })
  });
  describe("rangeMaker(spec), spec="+JSON.stringify(rangeSpec), function() {
    var range=SD.rangeMaker(rangeSpec);
    it("it should have have the spec given", function() {
      expect(range).toBeExtensionOf(rangeSpec);
    })
  });
});

describe("elementMaker", function() {
  describe("elementMaker()", function() {
    var element, element2, element3;
    beforeEach(function() {
      spyOn(SD, "generateIdentificator").and.callThrough();
      element = SD.elementMaker();
      element2 = SD.elementMaker();
    });
    describe("#identificator", function() {
      it("should call SD.generateIdentificator", function() {
	expect(SD.generateIdentificator).toHaveBeenCalled();
      })
    });
    describe("#parent", function() {
      it("should be null", function() {
	expect(element.parent).toBeNull();
      });
    });
    describe("#children", function() {
      it("should be an empty list after the initialization", function() {
	expect(element.children).toEqual([]);
      });
    });
    describe("#add", function() {
      describe("adding one element", function() {
	beforeEach(function() {
	  element.add(element2);
	});
	it("#children should have length 1", function() {
	  expect(element.children.length).toBe(1);
	});
	it("element2.parent =  element", function() {
	  expect(element2.parent).toBe(element);
	});
      });
    });
    describe("#remove", function() {
      it("if element is not the parent, should not set parent=null", function() {
	element3=SD.elementMaker();
	element3.add(element2);
	element.removeChild(element2)
	expect(element2.parent).not.toBeNull();
      })
      describe("removing an element after adding it", function() {
	beforeEach(function() {
	  element.add(element2);
	  element.removeChild(element2);
	});
	it("#children should have length 0", function() {
	  expect(element.children.length).toBe(0);
	});
	it("element2.parent = null", function() {
	  expect(element2.parent).toBeNull();
	});
      });
    });
    describe("#color", function() {
      it("should be null", function() {
	expect(element.color).toBeNull();
      });
      it("changing to red", function() {
	element3 = SD.elementMaker({color:"red"});
	element3.updateSVG();
	expect(element3.svgElement.getAttribute("stroke")).toBe("red");
      })
    })
    describe("#range", function() {
      it("it should be equal to "+JSON.stringify(rangeProto), function() {
	expect(element.range).toBeExtensionOf(rangeProto);
      });
    });
    describe("#xRange() and #yRange()", function() {
      it("should be equal to 100", function() {
	expect(element.xRange()).toBe(100);
	expect(element.yRange()).toBe(100);
      });
    });
    

    describe("#svgTag", function() {
      it("should be 'g'", function() {
	expect(element.svgTag).toBe("g");
      })
    });
    describe("#svgAttributes", function() {
      it("should be empty", function() {
	expect(element.svgAttributes).toEqual({});
      });
      describe("changing stroke to red", function() {
	describe("#svgElement after updatingSVG", function() {
	  it("should have attribute 'stroke:red'", function() {
	    element.svgAttributes["stroke"]="red";
	    element.updateSVG();
	    expect(element.svgElement.getAttribute("stroke")).toBe("red");
	  })
	})
      })
    });
    describe("#htmlClasses", function() {
      it("should contain 'Element'", function() {
	expect(element.htmlClasses).toContain("Element");
      })
    });


    describe("#svgElement", function() {
      it("should be null", function() {
	expect(element.svgElement).toBeNull();
      });
      describe("after calling #updateSVG", function() {
	beforeEach(function() {
	  element.updateSVG();
	});
	it("should be <g>", function() {
	  expect(element.svgElement.tagName).toBe("g");
	});
	it("shoud have id = #identificator", function() {
	  expect(element.svgElement.id).toBe(element.identificator);
	});
	it("should have 'Element' class", function() {
	  expect(element.svgElement).toContainClass('Element');
	})
	describe("after changing svgTag to 'path' and updating again", function() {
	  beforeEach(function() {
	    element.svgTag = "path";
	    element.updateSVG();
	  });
	  xit("should be <path>", function() {
	    expect(element.svgElement.tagName).toBe("path");
	  })
	})
      }); 
    });

    describe("#appendSVG", function() {
      describe("when the argument is a sceneElement", function() {
	//beforeEach(function() {
	//	element2 = new SceneElement();
	//	element2.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
	//});
	describe("if #svgElement is not defined", function() {
	  it("should call updateSVG", function() {
	    expect(element.svgElement).toBeNull();
	    spyOn(element,'updateSVG').and.callThrough();
	    element.appendSVG(element2);
	    expect(element.updateSVG).toHaveBeenCalled();
	  })
	});
	describe("when #svgElement is defined", function() {
	  beforeEach(function() {
	    element.svgElement=document.createElementNS("http://www.w3.org/2000/svg","g");
	    element2.svgElement=document.createElementNS("http://www.w3.org/2000/svg","g");
	    element.appendSVG(element2);
	  });
	  it("should append SVGElements", function() {
	    expect(Array.prototype.slice.call(element.svgElement.children)).toContain(element2.svgElement);
	  });				
	  it("and parentNode should be ok", function() {
	    expect(element2.svgElement.parentNode).toBe(element.svgElement);
	  })
	})
      });
      describe("when the argument is a HTMLElement", function() {
	beforeEach(function() {
	  element.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
	});
	it("should append it to svg", function() {
	  htmlElement = document.createElement("p");
	  element.appendSVG(htmlElement);
	  expect(Array.prototype.slice.call(element.svgElement.children)).toContain(htmlElement);
	});
	it("should also do it if the argument is SVGElement", function() {
	  svgElement = document.createElementNS("http://www.w3.org/2000/svg","path");
	  element.appendSVG(svgElement);
	  expect(Array.prototype.slice.call(element.svgElement.children)).toContain(svgElement);
	});
	xit("should also inject argument if it is string", function() {
	  svgElement = "<p>html code</p>"
	  element.appendSVG(svgElement);
	  expect(Array.prototype.slice.call(element.svgElement.children)).toContain(svgElement);
	});
      });		
    })

    describe("remove svg", function() {
      beforeEach(function() {
	element3 = SD.elementMaker();
	element.add(element2);
	element.add(element3);
	element.plotSVG();
      }) 
      describe("#svgRemoveChild", function() {
	beforeEach(function() {
	  element.svgRemoveChild(element2);
	})
	it("should remove element2.svgElement", function() {
	  expect(element2.svgElement).not.toBeDescendantOf(element.svgElement);
	})
	it("should not remove element3.svgElement", function() {
	  expect(element3.svgElement).toBeDescendantOf(element.svgElement);
	})
	describe("removing svgElement that is not a child", function() {
	  it("should not change anything", function() {
	    var element4 = SD.elementMaker();
	    element4.plotSVG();
	    element.svgRemoveChild(element4);
	    expect(true).toBe(true);
	  })
	})
      })
      describe("#svgRemoveChildren", function() {
	it("should remove all children", function() {
	  console.log(element.svgElement.children.length);
	  element.svgRemoveChildren();
	  expect(element2.svgElement).not.toBeDescendantOf(element.svgElement);
	  expect(element3.svgElement).not.toBeDescendantOf(element.svgElement);
	})
      })
    })
    

    describe("#plotSVG", function() {
      beforeEach(function() {
	element.add(element2);
	spyOn(element, 'updateSVG').and.callThrough();
	spyOn(element2, 'plotSVG');
	spyOn(element, 'appendSVG');
	element.plotSVG();
      })
      it("should call updateSVG", function() {
	expect(element.updateSVG).toHaveBeenCalled();
      });
      it("should call plotSVG of a child", function() {
	expect(element2.plotSVG).toHaveBeenCalled();
      });
      it("should call updateSVG with a child ", function() {
	expect(element.appendSVG).toHaveBeenCalledWith(element2);
      });
    });


    describe("#updateSVG of a child element", function() {
      describe("after appendig a child, updating it , changing its tagName and updating again", function() {
	xit("should be the only child ", function() {
	  element.svgElement=document.createElementNS("http://www.w3.org/2000/svg","g");
	  element2 = SD.elementMaker();
	  element2.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
	  element.appendSVG(element2);
	  
	  element2.svgTag = 'path';
	  element2.updateSVG();
	  
	  expect(element2.svgElement.tagName).toBe("path");
	  expect(element.svgElement.children.length).toBe(1);
	  expect(element.svgElement.children[0].tagName).toBe("path");
	});
      })
    });
  });
});

describe("sceneMaker()", function() {
  var scene, scene2, element, numbersOfSVGtags, div;
  beforeEach(function() {
    numbersOfSVGtags = document.getElementsByTagName('svg').length;
    spyOn(SD,"sceneMaker").and.callThrough();
    scene = SD.sceneMaker(); 
  });
  it("should call sceneMaker", function() {
    expect(SD.sceneMaker).toHaveBeenCalled();
  });
  it("should not create <svg> after the initialization", function() {
    expect(document.getElementsByTagName('svg').length).toBe(numbersOfSVGtags);
  });

  describe("#svgTag", function() {
    it("should be 'svg'", function () {
      expect(scene.svgTag).toBe("svg");
    })
  })
  describe("#svgAttributes", function() {
    xit("should have 'viewBox' set", function() {
      expect(scene.svgAttributes['viewBox']).toBe(
	''+scene.range.xMin+' '+(-scene.range.yMax)+' '+scene.xRange()+' '+scene.yRange());
    })
  })


  describe("#svgElement", function() {
    describe("after calling #updateSVG()",function() {
      beforeEach(function () {
	scene.updateSVG();
      });
      it("should be an instance of SVGElement", function() {
	expect(scene.svgElement instanceof SVGElement).toBe(true);
      });
      it("and should have <svg> tag", function(){
	expect(scene.svgElement.tagName).toBe("svg");
      })
    });
  });
  describe("#updateSVG",function() {
    describe("after the assigin non null div", function() {
      var div = jasmine.createSpyObj('div', ['appendChild']);
      it("should call div.appendChild", function() {
	scene.div = div; 
	scene.updateSVG();
	expect(div.appendChild).toHaveBeenCalled();
      });
    });
  });
  describe("#div", function() {
    it("should be null", function() {
      expect(scene.div).toBeNull();
    });
    describe("when #div not null", function() {
      describe("#svgElement", function() {
	describe("after calling #updateSVG()",function() {
	  beforeEach(function () {
	    div = document.createElement("div");
	    scene.div = div;
	    scene.updateSVG();
	  });
	  it("should have the div as parent", function() {
	    expect(scene.svgElement.parentNode).toBe(div);
	  });
	  it("should be descendant of div", function() {
	    expect(scene.svgElement).toBeDescendantOf(div);
	  });
	});
      });
    })
    describe("sceneMaker({div:div})", function() {
      it("should have the div as parent", function() {
	div = document.createElement("div");
	scene2 = SD.sceneMaker({div:div})
	scene2.updateSVG();
	expect(scene2.svgElement.parentNode).toBe(div);
      });
    })
  });
  describe("#range", function() {
    it("al inicion deberia tener xMin = 0", function() {
      expect(scene.range.xMin).toBe(0);
    });
  });
  describe("#add", function() {
    it("should add an element", function() {
      element = SD.elementMaker();
      scene.add(element);
      expect(scene.children.length).toBe(1);
    });
  });
});

describe("circleMaker", function() {
  var circle, scene;
  beforeEach(function() {
    spyOn(SD,"elementMaker").and.callThrough();
    circle = SD.circleMaker();
  })
  it("should call elementMaker", function() {
    expect(SD.elementMaker).toHaveBeenCalled();
  })
  it("should have x = 50, y = 50 and r=50", function() {
    expect(circle.x).toBe(50);
    expect(circle.y).toBe(50);
    expect(circle.r).toBe(50);
  });
  it("should have tag 'circle'", function() {
    expect(circle.svgTag).toBe('circle');
  });
  describe("#plotSVG", function() {
    beforeEach(function() {
      scene=SD.sceneMaker();
      scene.add(circle);
      spyOn(circle, 'plotSVG').and.callThrough();
      scene.plotSVG();
    });
    it("should be called by scene.plotSVG", function() {
      expect(circle.plotSVG).toHaveBeenCalled();
    });
    it("should create SVGElement",function() {
      expect(circle.svgElement instanceof SVGElement).toBe(true);
    });
    it("should create a circle of radius 50", function() {
      expect(circle.svgElement.tagName).toBe("circle");
      expect(circle.svgElement.getAttributeNode("r").value).toEqual("50");
    });
  });
});

describe("lineMaker", function() {
  var line = SD.lineMaker(); 
  it("should have "+SD.LINE_SPEC, function() {
    var spec = SD.LINE_SPEC;
    for (var key in spec) {
      expect(line[key]).toBe(spec[key])
    }
  })
})

describe("pointMaker", function() {
  var point = SD.pointMaker();
  it("should have x = 50 and y = 50", function() {
    expect(point.x).toBe(50);
    expect(point.y).toBe(50);
  });
  describe("#plotSVG", function() {
    it("should create a circle of radius 50", function() {
      point.plotSVG();
      expect(point.svgElement.tagName).toBe("circle");
      expect(point.svgElement.getAttributeNode("r").value).toEqual("1");
    });
  });
});

describe("functionGraphMaker()", function() {
  var functionGraph, functionGraph2;
  beforeEach(function() {
    functionGraph = SD.functionGraphMaker();
  });
  describe("#range", function() {
    it("should be null", function() {
      expect(functionGraph.range).toBeDefined();
    })
  });

  describe("#parent", function() {
    it("should be null", function() {
      expect(functionGraph.parent).toBeNull();
    });
  });

  describe("#style", function() {
    it("should be '-'", function() {
      expect(functionGraph.style).toBe("-");
    }) 
  })

  describe("#svgElement", function() {
    describe("after calling #plotSVG", function() {
      describe("without parent", function() {
	var point;
	beforeEach(function() {
	  functionGraph.plotSVG();
	});
	it("should be a 'g'", function() {
	  expect(functionGraph.svgElement.nodeName).toBe("g");
	});
	it("should create "+SD.NUMBER_OF_SEGMENTS_IN_FUNCTIONGRAPH+" segments", function(){
	  var segs = functionGraph.svgElement.getElementsByTagName("line");
	  expect(segs.length).toBe(SD.NUMBER_OF_SEGMENTS_IN_FUNCTIONGRAPH);
	  expect(segs[0].tagName).toBe("line");
	});
	describe('after removing', function() {
	  it("it should not have any children", function () {
	    functionGraph.svgRemoveChildren();
	    var segs = functionGraph.svgElement.getElementsByTagName("line");
	    expect(segs.length).toBe(0);
	  });
	});
	it("should have a 'FunctionGraph' class", function() {
	  expect(functionGraph.svgElement).toContainClass("FunctionGraph");
	});
      });
      describe("with not null parent", function() {
	var svgElement = {
	  svgElement: document.createElementNS("http://www.w3.org/2000/svg","g")
	};
	beforeEach(function() {
	  functionGraph.parent = svgElement;
	  functionGraph.updateSVG();
	});
	it("should have a SVGElement as its value", function() {
	  expect(functionGraph.svgElement instanceof SVGElement).toBe(true);
	});
	xit("should have elements#svgElement as parent", function() {
	  expect(functionGraph.svgElement.parentNode).toBe(svgElement.svgElement);
	});
      });
    });
  });

  describe("#identificator", function() {
    it("should be generate by generateIdentificator", function() {
      spyOn(SD,"generateIdentificator");
      functionGraph = SD.functionGraphMaker();
      expect(SD.generateIdentificator).toHaveBeenCalled();
    });
  });

  describe("#plotSVG", function() {
    it("should call #updateSVG", function() {
      spyOn(functionGraph, 'updateSVG');
      functionGraph.plotSVG();
      expect(functionGraph.updateSVG).toHaveBeenCalled();
    });
  })

});

