
main color:
 tabbar select - #e41f19
 tabbat unselect - #717171


css:

/*tabbar*/

.tui-tabbar {
	width: 100%;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 99999;
	background: #fff;
	height: 100rpx;
	left: 0;
	bottom: 0;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
	width: 100%;
	height: env(safe-area-inset-bottom);
}

.tui-tabbar::before {
	content: '';
	width: 100%;
	border-top: 1rpx solid #d9d9d9;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}

.tui-tabbar-item {
	flex: 1;
	width: 25%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	font-size: 24rpx;
	color: #666;
	height: 80rpx;
}

.tui-ptop-4 {
	padding-top: 4rpx;
}

.tui-scale {
	font-weight: bold;
	transform: scale(0.8);
	transform-origin: center 100%;
	line-height: 30rpx;
}

.tui-item-active {
	color: #e41f19 !important;
}

/*tabbar*/