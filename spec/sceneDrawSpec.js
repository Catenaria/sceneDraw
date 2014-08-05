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
		var element, element2;
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
				it("element2.parentSceneElement =  element", function() {
					expect(element2.parent).toBe(element);
				});
			});
		});
		describe("#remove", function() {
			describe("removing an element after adding it", function() {
				beforeEach(function() {
					element.add(element2);
					element.remove(element2);
				});
				it("#children should have length 0", function() {
					expect(element.children.length).toBe(0);
				});
				it("element2.parentSceneElement = null", function() {
					expect(element2.parent).toBeNull();
				});
			});
		});

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

		describe("#tagSVG", function() {
			it("should be", function() {
				expect(element.tagSVG).toBe("g");
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
				describe("after changing tagSVG to 'path' and updating again", function() {
					beforeEach(function() {
						element.tagSVG = "path";
						element.updateSVG();
					});
					xit("should be <path>", function() {
						expect(element.svgElement.tagName).toBe("path");
					})
				})
			}); 
		});
		describe("#appendSVG", function() {
			describe("when the argument is SceneElement", function() {
				beforeEach(function() {
					element2 = new SceneElement();
					element2.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
				});
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

	describe("#updateSVG of a child element", function() {
		describe("after appendig a child, updating it , changing its tagName and updating again", function() {
			it("should be the only child ", function() {
				element.svgElement=document.createElementNS("http://www.w3.org/2000/svg","g");
				element2 = new SceneElement();
				element2.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
				element.appendSVG(element2);

				element2.tagSVG = 'path';
				element2.updateSVG();

				expect(element2.svgElement.tagName).toBe("path");
				expect(element.svgElement.children.length).toBe(1);
				expect(element.svgElement.children[0].tagName).toBe("path");
			});
		})
	});
	
	
});
});

describe("new Scene()", function() {
  var scene;
  var element;
  var numbersOfSVGtags;
  beforeEach(function() {
		numbersOfSVGtags = document.getElementsByTagName('svg').length;
    scene = new Scene(); 
  });
  
	it("should be instance of SceneElement", function() {
		expect(scene instanceof SceneElement).toBe(true);
	});

	it("should not create <svg> after the initialization", function() {
		expect(document.getElementsByTagName('svg').length).toBe(numbersOfSVGtags);
	});

	describe("#div", function() {
		it("should be null", function() {
			expect(scene.div).toBeNull();
		});
	});

	describe("#tagSVG", function() {
		it("should be 'svg'", function () {
			expect(scene.tagSVG).toBe("svg");
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

	describe("#elements", function() {
		it("should be instance of GroupOfSceneElements", function() {
			expect(scene.elements instanceof GroupOfSceneElements).toBe(true)
		});
		describe("after calling #plotSVG", function() {
			it("#elements.plotSVG should be called", function() {
				scene.svgElement=jasmine.createSpyObj('svgElement', ['appendChild']); 
				scene.plotSVG();
				expect(scene.elements.plotSVG).toHaveBeenCalled();
			})
		})
	});

	describe("#range", function() {
		it("al inicion deberia tener xMin = 0", function() {
			expect(scene.range.xMin).toBe(0);
		});
	});

  describe("#add", function() {
    it("calls GroupOfSceneElements#add", function() {
      scene.add(element);
      expect(scene.elements.add).toHaveBeenCalled();
    });
  });
  
	describe("#plotSVG", function() {
		beforeEach(function() {
			spyOn(scene, 'updateSVG');
			scene.plotSVG();
		});
		it("should call updateSVG", function() {
			expect(scene.updateSVG).toHaveBeenCalled();
		});
		it("should call updateSVG", function() {
			expect(scene.elements.plotSVG).toHaveBeenCalled();
		});
	});

	
});

describe("new Scene(div)", function() {
	var div = document.createElement("div");
	var scene = new Scene(div);
	describe("#div", function() {
		it("should be HTTPElement 'div'", function() {
			expect(scene.div).toBe(div);
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG()",function() {
			beforeEach(function () {
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
});

describe("new GroupOfSceneElements()", function() {
	var elements;

	beforeEach(function() {
		elements = new GroupOfSceneElements();
	});

	it("should be instance of SceneElement", function() {
		expect(elements instanceof SceneElement).toBe(true);
	});
	it("#identificator should be defined", function() {
		expect(elements.identificator).toBeBetween(0,1);
	});

  describe("#length", function() {
    it("should be equal to 0 after the initialization", function() {
      expect(elements.length()).toBe(0);
    });
    it("deberia dar 1 si _lista tiene un element", function() {
      var element2;
      elements._lista.push(element2);
      expect(elements.length()).toBe(1);
    });
  });

  describe("#add", function() {
    it("deberia estar definido",function() {
      expect(elements.add).toBeDefined();
    });
    describe("despues de añadir un element", function() {
      var element;
      beforeEach(function() {
				element = {parentSceneElement: null};
				elements.add(element);
      });
      it("deberia asignar el parentSceneElement al element", function() {
				expect(element.parentSceneElement).toBe(elements);
      });
      it("deberia tener longitud 1", function() {
				expect(elements.length()).toBe(1);
      });
    });
  });
  
	describe("#plotSVG", function() {
		beforeEach(function() {
			element = {};
			element.plotSVG = jasmine.createSpy();
      elements.add(element);
			spyOn(elements, 'updateSVG');
			elements.plotSVG();
		});
		it("should call #updateSVG", function() {
			expect(elements.updateSVG).toHaveBeenCalled();
		});
		it("should call element#updateSVG", function() {
			expect(element.plotSVG).toHaveBeenCalled();
		});
	});

  describe("#remove", function() {

		var element = jasmine.createSpyObj('element', ['remove']);

    it("deberia estar definido", function() {
      expect(elements.remove).toBeDefined();
    });
    it("deberia eliminar el elmento de la lista", function() {
      elements.remove(element);
      expect(elements.length()).toBe(0);
    });
    it("deberia llamar remove de element", function() {
      elements.remove(element);
      expect(element.remove).toHaveBeenCalled();
    })
  });
});

describe("new GroupOfSceneElementos(scene)", function() {
	var scene;
	
	beforeEach(function() {
		scene = {
			svgElement: document.createElementNS("http://www.w3.org/2000/svg","svg")
		}; //double
		elements = new GroupOfSceneElements(scene);
	});

	describe("#parentSceneElement", function() {
		it("deberia tener parentSceneElement definido", function() {
			expect(elements.parentSceneElement).toBeDefined();
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG", function() {
			beforeEach(function() {
				elements.updateSVG();
			});
			it("should have an object as its value", function() {
				expect(elements.svgElement instanceof SVGElement).toBe(true);
			});
			it("should have svg of scene as parentNode", function() {
				expect(elements.svgElement.parentNode).toBe(scene.svgElement);
			});
		});
	});
});

describe("new Circle", function() {
	var circle = new Circle();
	it("should have x = 0, y = 0 and r=1", function() {
		expect(circle.x).toBe(0);
		expect(circle.y).toBe(0);
		expect(circle.r).toBe(1);
	});
	it("should be instance of SceneElement", function() {
		expect(circle instanceof SceneElement).toBe(true);
	});
	describe("#plotSVG", function() {
		var elements;
		it("should be called by elements.plotSVG", function() {
			elements = new GroupOfSceneElements();
			elements.add(circle);
			spyOn(circle, 'plotSVG');
			elements.plotSVG();
			expect(circle.plotSVG).toHaveBeenCalled();
		});
		beforeEach(function() {
			circle.plotSVG();
		});
		it("should create SVGEelement",function() {
			expect(circle.svgElement instanceof SVGElement).toBe(true);
		});
		it("should create a circle of radius 1", function() {
			expect(circle.svgElement.tagName).toBe("circle");
		});

	});
});


describe("new Point()", function() {
	var point = new Point();
	it("should have x = 0 and y = 0", function() {
		expect(point.x).toBe(0);
		expect(point.y).toBe(0);
	});
	it("should be instance of SceneElement", function() {
		expect(point instanceof SceneElement).toBe(true);
	});
	it("should be instance of Circle", function() {
		expect(point instanceof Circle).toBe(true);
	});
	
	
});
  
describe("new FunctionGraph()", function() {
  var functionGraph;
  beforeEach(function() {
    functionGraph = new FunctionGraph();
  });

	describe("#range", function() {
		it("should be null", function() {
			expect(functionGraph.range).toBeDefined();
		})
	});

	describe("#parentSceneElement", function() {
		it("should be null", function() {
			expect(functionGraph.parentSceneElement).toBeNull();
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG", function() {
			describe("without parentSceneNode", function() {
				beforeEach(function() {
					functionGraph.updateSVG();
				});
				it("should be a 'path'", function() {
					expect(functionGraph.svgElement.nodeName).toBe("path");
				});
				it("should have a 'functionGraph' class", function() {
					expect(functionGraph.svgElement).toContainClass("functionGraph");
				});
			});
			describe("with parentSceneNode", function() {
				var elements = {
					svgElement: document.createElementNS("http://www.w3.org/2000/svg","g")
				};
				beforeEach(function() {
					functionGraph.parentSceneElement = elements;
					functionGraph.updateSVG();
				});
				it("should have a SVGElement as its value", function() {
					expect(functionGraph.svgElement instanceof SVGElement).toBe(true);
				});
				it("should have elements#svgElement as parent", function() {
					expect(functionGraph.svgElement.parentNode).toBe(elements.svgElement);
				});
			});
		});
	});

  describe("#identificator", function() {
    it("deberia tener identificator definido", function() {
			expect(functionGraph.identificator).toBeDefined();
    });
    it("deberia ser str con un numero entre 0 y 1", function () {
			expect(parseFloat(functionGraph.identificator)).toBeBetween(0, 1);
    });
		describe("cuando hay mas que uno", function() {
			it("si se crea dos no deberian repetirse", function() {
				var f1 = new FunctionGraph();
				var f2 = new FunctionGraph();
				expect(f1.identificator).not.toBe(f2.identificator);
			});
			it("si se crea 10000 no deberian repetirse", function() {
				var identificatores=[];
				for (var i=0;i<10000;i++) {
					element = new FunctionGraph();
					identificatores.push(element.identificator);
				}
				expect(identificatores).toHaveDistinctValues();
			});
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

